package com.codecool.travelhelper.login_registration_logout.webclients;


import com.codecool.travelhelper.aws.database.models.MyUserTable;
import com.codecool.travelhelper.aws.database.repositories.UserRepository;
import com.codecool.travelhelper.login_registration_logout.utils.sendMail.KindOfEmail;
import com.codecool.travelhelper.login_registration_logout.utils.sendMail.SendMailToUser;
import com.codecool.travelhelper.login_registration_logout.utils.Util;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class RegistrationImpl {
    @Autowired
    SendMailToUser sendMailToUser;

    @Autowired
    Util util;

    @Autowired
    UserRepository userRepository;

    public void saveNewUserToDB(String data) {

        JsonParser jsonParser = new JsonParser();
        JsonObject commentJsonObject = (JsonObject) jsonParser.parse(data);
        String fullName = commentJsonObject.get("fullName").getAsString();
        String nickName = commentJsonObject.get("nickName").getAsString();
        String birthday = commentJsonObject.get("birthday").getAsString();
        String eMail = commentJsonObject.get("email").getAsString();
        String password = commentJsonObject.get("password").getAsString();

        Optional<MyUserTable> userFromDB = userRepository.findAllByUserEMail(eMail);
        if (userFromDB.isPresent()) {
            System.out.println("this email is already taken");
        } else {
            userRepository.save(
                    new MyUserTable(
                            fullName,
                            nickName,
                            birthday,
                            eMail,
                            util.hashPassword(password)
                    )
            );
            sendMailToUser.sendSimpleEmail(eMail, fullName, KindOfEmail.AFTER_REGISTRATION);
        }
    }
}

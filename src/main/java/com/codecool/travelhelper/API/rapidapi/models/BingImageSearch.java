package com.codecool.travelhelper.API.rapidapi.model.apimodel;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class BingImageSearch {
    private List<String> imgUrls;
}
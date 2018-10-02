package com.vivid.partnerships.interview;

import javax.validation.constraints.NotNull;

public class Venue {
    public Integer id;

    @NotNull
    public String name;

    @NotNull
    public String city;

    @NotNull
    public String state;
}

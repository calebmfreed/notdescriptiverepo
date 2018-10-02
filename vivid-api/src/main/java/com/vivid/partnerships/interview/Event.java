package com.vivid.partnerships.interview;

import javax.validation.constraints.NotNull;
import java.util.Date;

// Must be public for row mapper
public class Event {
    public Integer id;

    @NotNull
    public String name;

    @NotNull
    public Date date;

    @NotNull
    public Venue venue;
}

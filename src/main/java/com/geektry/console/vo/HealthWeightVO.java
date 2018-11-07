package com.geektry.console.vo;

import java.time.LocalDateTime;

/**
 * @author Chaohang Fu
 */
public class HealthWeightVO {

    private LocalDateTime samplingTime;
    private Float kg;

    public LocalDateTime getSamplingTime() {
        return samplingTime;
    }

    public void setSamplingTime(LocalDateTime samplingTime) {
        this.samplingTime = samplingTime;
    }

    public Float getKg() {
        return kg;
    }

    public void setKg(Float kg) {
        this.kg = kg;
    }

    @Override
    public String toString() {
        return "HealthWeightVO{" +
                "samplingTime=" + samplingTime +
                ", kg=" + kg +
                '}';
    }
}

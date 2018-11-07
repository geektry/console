package com.geektry.console.vo;

import java.time.LocalDateTime;

/**
 * @author Chaohang Fu
 */
public class NotePvOfTimeVO {

    private LocalDateTime samplingTime;
    private Long pv;

    public LocalDateTime getSamplingTime() {
        return samplingTime;
    }

    public void setSamplingTime(LocalDateTime samplingTime) {
        this.samplingTime = samplingTime;
    }

    public Long getPv() {
        return pv;
    }

    public void setPv(Long pv) {
        this.pv = pv;
    }

    @Override
    public String toString() {
        return "NotePvOfTimeVO{" +
                "samplingTime=" + samplingTime +
                ", pv=" + pv +
                '}';
    }
}

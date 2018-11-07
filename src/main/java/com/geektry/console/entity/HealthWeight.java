package com.geektry.console.entity;

import java.time.LocalDateTime;

/**
 * @author Chaohang Fu
 */
public class HealthWeight {

    private Long id;
    private Float kg;
    private LocalDateTime createdTs;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getKg() {
        return kg;
    }

    public void setKg(Float kg) {
        this.kg = kg;
    }

    public LocalDateTime getCreatedTs() {
        return createdTs;
    }

    public void setCreatedTs(LocalDateTime createdTs) {
        this.createdTs = createdTs;
    }
}

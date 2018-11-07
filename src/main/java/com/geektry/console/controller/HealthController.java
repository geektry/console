package com.geektry.console.controller;

import com.geektry.console.framework.TokenRequired;
import com.geektry.console.service.HealthService;
import com.geektry.console.util.DateTimeConverter;
import com.geektry.console.vo.HealthWeightVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author Chaohang Fu
 */
@TokenRequired
@RestController
public class HealthController {

    @Autowired
    private HealthService healthService;

    @GetMapping("/api/statistics/health/weight")
    public List<HealthWeightVO> countHealthWeight(@RequestParam("startTime") String startTimeStr,
                                                  @RequestParam("endTime") String endTimeStr) {
        LocalDateTime startTime = DateTimeConverter.toDateTime(startTimeStr);
        LocalDateTime endTime = DateTimeConverter.toDateTime(endTimeStr);
        return healthService.countHealthWeight(startTime, endTime);
    }

    @PostMapping("/api/health/weight")
    public void postWeight(@RequestBody HealthWeightVO healthWeightVO) {
        healthService.insertWeight(healthWeightVO);
    }
}

package com.geektry.console.service;

import com.geektry.console.vo.HealthWeightVO;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author Chaohang Fu
 */
public interface HealthService {

    /**
     * 统计体重
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return 统计数据
     */
    List<HealthWeightVO> countHealthWeight(LocalDateTime startTime, LocalDateTime endTime);

    /**
     * 插入weight
     * @param healthWeightVO 体重
     */
    void insertWeight(HealthWeightVO healthWeightVO);
}

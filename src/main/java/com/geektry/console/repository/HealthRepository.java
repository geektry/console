package com.geektry.console.repository;

import com.geektry.console.entity.HealthWeight;
import com.geektry.console.vo.HealthWeightVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author Chaohang Fu
 */
@Mapper
@Repository
public interface HealthRepository {

    /**
     * 统计体重
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return 统计数据
     */
    List<HealthWeightVO> countHealthWeight(@Param("startTime") LocalDateTime startTime,
                                           @Param("endTime") LocalDateTime endTime);

    /**
     * 今天体重是否被记录
     * @return 是否被记录
     */
    Boolean getIsWeightRecordedToday();

    /**
     * 插入weight
     * @param healthWeight 体重
     */
    void insertWeight(HealthWeight healthWeight);
}

package com.geektry.console.service.impl;

import com.geektry.console.entity.HealthWeight;
import com.geektry.console.framework.RuntimeExceptionMessage;
import com.geektry.console.framework.ServiceRuntimeException;
import com.geektry.console.repository.HealthRepository;
import com.geektry.console.service.HealthService;
import com.geektry.console.vo.HealthWeightVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Chaohang Fu
 */
@Service
public class HealthServiceImpl implements HealthService {

    @Autowired
    private HealthRepository healthRepository;

    @Override
    public List<HealthWeightVO> countHealthWeight(LocalDateTime startTime, LocalDateTime endTime) {
        List<HealthWeightVO> healthWeightVOs =  healthRepository.countHealthWeight(startTime, endTime);
        return this.fillWithZero(healthWeightVOs, startTime, endTime);
    }

    @Override
    public void insertWeight(HealthWeightVO healthWeightVO) {

        boolean isWeightRecordedToday = healthRepository.getIsWeightRecordedToday();

        if (isWeightRecordedToday) {
            throw new ServiceRuntimeException(RuntimeExceptionMessage.WEIGHT_RECORD_DATE_INVALID);
        }

        Float kg = healthWeightVO.getKg();
        if (StringUtils.isEmpty(kg)) {
            throw new ServiceRuntimeException(RuntimeExceptionMessage.WEIGHT_NULL);
        }

        healthRepository.insertWeight(new HealthWeight() {{
            setKg(healthWeightVO.getKg());
        }});
    }

    private List<HealthWeightVO> fillWithZero(List<HealthWeightVO> healthWeightVOs, LocalDateTime startTime, LocalDateTime endTime) {

        Map<LocalDateTime, HealthWeightVO> healthWeightVOMap = new HashMap<>(32);
        for (HealthWeightVO healthWeightVO : healthWeightVOs) {
            healthWeightVOMap.put(healthWeightVO.getSamplingTime(), healthWeightVO);
        }

        List<HealthWeightVO> resultVOs = new ArrayList<>();
        LocalDateTime cursorTime = startTime;
        while (!cursorTime.isAfter(endTime)) {
            HealthWeightVO healthWeightVO = healthWeightVOMap.get(cursorTime);
            if (healthWeightVO == null) {
                HealthWeightVO vo = new HealthWeightVO();
                vo.setSamplingTime(cursorTime);
                vo.setKg(0.0F);
                resultVOs.add(vo);
            } else {
                resultVOs.add(healthWeightVO);
            }
            cursorTime = cursorTime.plusDays(1L);
        }
        return resultVOs;
    }
}

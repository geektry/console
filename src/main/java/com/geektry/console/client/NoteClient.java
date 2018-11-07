package com.geektry.console.client;

import com.geektry.console.framework.ClientConfiguration;
import com.geektry.console.vo.NoteGroupVO;
import com.geektry.console.vo.NotePvOfIdVO;
import com.geektry.console.vo.NotePvOfTimeVO;
import com.geektry.console.vo.NoteVO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Chaohang Fu
 */
@Component
@FeignClient(name = "null", url = "${feign-client.url.note}", configuration = ClientConfiguration.class)
public interface NoteClient {

    /**
     * 获取notes
     * @param groupId 分组id
     * @return 笔记
     */
    @GetMapping("/api/notes")
    List<NoteVO> listNotes(@RequestParam("groupId") Long groupId);

    /**
     * 获取note
     * @param noteId 笔记id
     * @return 笔记
     */
    @GetMapping("/api/notes/{noteId}")
    NoteVO getNote(@PathVariable("noteId") Long noteId);

    /**
     * 插入note
     * @param noteVO 笔记
     * @return 笔记id
     */
    @PostMapping("/api/notes/")
    Long postNote(@RequestBody NoteVO noteVO);

    /**
     * 更新note
     * @param noteVO 笔记
     * @param noteId 笔记id
     */
    @PutMapping("/api/notes/{noteId}")
    void putNote(@RequestBody NoteVO noteVO,
                 @PathVariable("noteId") Long noteId);

    /**
     * 删除note
     * @param noteId 笔记id
     */
    @DeleteMapping("/api/notes/{noteId}")
    void deleteNote(@PathVariable("noteId") Long noteId);

    /**
     * 统计note pv of time
     * @param noteId 笔记id
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return 统计数据
     */
    @GetMapping("/api/statistics/pv_of_time")
    List<NotePvOfTimeVO> countPvOfTime(@RequestParam("noteId") Long noteId,
                                       @RequestParam("startTime") String startTime,
                                       @RequestParam("endTime") String endTime);

    /**
     * 统计note pv of id
     * @param samplingTime 采样时间
     * @return 统计数据
     */
    @GetMapping("/api/statistics/pv_of_id")
    List<NotePvOfIdVO> countPvOfId(@RequestParam("samplingTime") String samplingTime);

    /**
     * 获取groups
     * @return 分组
     */
    @GetMapping("/api/groups")
    List<NoteGroupVO> listGroups();

    /**
     * 获取group
     * @param groupId 分组id
     * @return 分组
     */
    @GetMapping("/api/groups/{groupId}")
    NoteGroupVO getGroup(@PathVariable("groupId") Long groupId);

    /**
     * 插入group
     * @param noteGroupVO 分组
     * @return 分组id
     */
    @PostMapping("/api/groups/")
    Long postGroup(@RequestBody NoteGroupVO noteGroupVO);

    /**
     * 更新group
     * @param noteGroupVO 分组
     * @param groupId 分组id
     */
    @PutMapping("/api/groups/{groupId}")
    void putGroup(@RequestBody NoteGroupVO noteGroupVO,
                  @PathVariable("groupId") Long groupId);

    /**
     * 删除group
     * @param groupId 分组id
     */
    @DeleteMapping("/api/groups/{groupId}")
    void deleteGroup(@PathVariable("groupId") Long groupId);
}

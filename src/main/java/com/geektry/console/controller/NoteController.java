package com.geektry.console.controller;

import com.geektry.console.framework.TokenRequired;
import com.geektry.console.client.NoteClient;
import com.geektry.console.vo.NoteGroupVO;
import com.geektry.console.vo.NotePvOfIdVO;
import com.geektry.console.vo.NotePvOfTimeVO;
import com.geektry.console.vo.NoteVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Chaohang Fu
 */
@TokenRequired
@RestController
public class NoteController {

    @Autowired
    private NoteClient noteClient;

    @GetMapping("/api/notes")
    public List<NoteVO> listNotes(@RequestParam(name = "groupId", required = false) Long groupId) {
        return noteClient.listNotes(groupId);
    }

    @GetMapping("/api/notes/{noteId}")
    public NoteVO getNote(@PathVariable("noteId") Long noteId) {
        return noteClient.getNote(noteId);
    }

    @PostMapping("/api/notes/")
    public Long postNote(@RequestBody NoteVO noteVO) {
        return noteClient.postNote(noteVO);
    }

    @PutMapping("/api/notes/{noteId}")
    public void putNote(@RequestBody NoteVO noteVO,
                        @PathVariable("noteId") Long noteId) {
        noteClient.putNote(noteVO, noteId);
    }

    @DeleteMapping("/api/notes/{noteId}")
    public void deleteNote(@PathVariable("noteId") Long noteId) {
        noteClient.deleteNote(noteId);
    }

    @GetMapping("/api/statistics/notes/pv_of_time")
    public List<NotePvOfTimeVO> countPvOfTime(@RequestParam(name = "noteId", required = false) Long noteId,
                                              @RequestParam("startTime") String startTime,
                                              @RequestParam("endTime") String endTime) {
        return noteClient.countPvOfTime(noteId, startTime, endTime);
    }

    @GetMapping("/api/statistics/notes/pv_of_id")
    public List<NotePvOfIdVO> countPvOfId(@RequestParam(name = "samplingTime", required = false) String samplingTime) {
        return noteClient.countPvOfId(samplingTime);
    }

    @GetMapping("/api/notes/groups")
    public List<NoteGroupVO> listGroups() {
        return noteClient.listGroups();
    }

    @GetMapping("/api/notes/groups/{groupId}")
    public NoteGroupVO getGroup(@PathVariable("groupId") Long groupId) {
        return noteClient.getGroup(groupId);
    }

    @PostMapping("/api/notes/groups/")
    public Long postGroup(@RequestBody NoteGroupVO noteGroupVO) {
        return noteClient.postGroup(noteGroupVO);
    }

    @PutMapping("/api/notes/groups/{groupId}")
    public void putGroup(@RequestBody NoteGroupVO noteGroupVO,
                         @PathVariable("groupId") Long groupId) {
        noteClient.putGroup(noteGroupVO, groupId);
    }

    @DeleteMapping("/api/notes/groups/{groupId}")
    public void deleteGroup(@PathVariable("groupId") Long groupId) {
        noteClient.deleteGroup(groupId);
    }
}

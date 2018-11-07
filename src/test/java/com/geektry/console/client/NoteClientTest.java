package com.geektry.console.client;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

/**
 * @author Chaohang Fu
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class NoteClientTest {

    @Autowired
    private NoteClient noteClient;

    @Test
    public void listNotes() {

        noteClient.listNotes(null);
    }
}
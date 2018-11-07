package com.geektry.console.vo;

/**
 * @author Chaohang Fu
 */
public class NoteVO {

    private Long id;
    private String path;
    private String title;
    private String mdContent;
    private String htmlContent;
    private Long pv;
    private String createdTs;
    private String modifiedTs;
    private Long groupId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMdContent() {
        return mdContent;
    }

    public void setMdContent(String mdContent) {
        this.mdContent = mdContent;
    }

    public String getHtmlContent() {
        return htmlContent;
    }

    public void setHtmlContent(String htmlContent) {
        this.htmlContent = htmlContent;
    }

    public Long getPv() {
        return pv;
    }

    public void setPv(Long pv) {
        this.pv = pv;
    }

    public String getCreatedTs() {
        return createdTs;
    }

    public void setCreatedTs(String createdTs) {
        this.createdTs = createdTs;
    }

    public String getModifiedTs() {
        return modifiedTs;
    }

    public void setModifiedTs(String modifiedTs) {
        this.modifiedTs = modifiedTs;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("NoteVO{");
        sb.append("id=").append(id);
        sb.append(", path='").append(path).append('\'');
        sb.append(", title='").append(title).append('\'');
        sb.append(", mdContent='").append(mdContent).append('\'');
        sb.append(", htmlContent='").append(htmlContent).append('\'');
        sb.append(", pv=").append(pv);
        sb.append(", createdTs='").append(createdTs).append('\'');
        sb.append(", modifiedTs='").append(modifiedTs).append('\'');
        sb.append(", groupId=").append(groupId);
        sb.append('}');
        return sb.toString();
    }
}

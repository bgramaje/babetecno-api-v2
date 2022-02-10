export class MailOutlook {
    html: string;
    text: string;
    subject: string;
    date: Date;
    from: string;
    messageId: string;

    constructor(messageId: string, textAsHtml: string, text: string, subject: string, date: Date, from: string) {
        this.messageId = messageId;
        this.html = textAsHtml;
        this.text = text;
        this.subject = subject;
        this.date = date;
        this.from = from;
    }
}
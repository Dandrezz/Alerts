import { Request, Response } from "express";
import axios from "axios";

const sendMessageTelegram = async(message: string):Promise<boolean> => {
    const send_text = message = 'https://api.telegram.org/bot' + process.env.BOT_TOKEN + '/sendMessage?chat_id=' + process.env.BOT_CHATID + '&parse_mode=Markdown&text=' + message;
    try {
        await axios.get(send_text);
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
}

export const sendMessagePrometheus = async(req: Request, res: Response) => {
    const alerts = req.body.alerts;
    for( let alert of alerts ){
        const { alertname, instance, job, startsAt } = alert.labels;
        const message = `Alert name: ${alertname}\nProblem started at ${startsAt}\nInstance: ${instance}\nJob: ${job}`;
        const validator = await sendMessageTelegram(message);
        if(!validator){
            return res.status(500).json({
                ok: false
            })
        }
    }
    res.json({
        ok: true
    })
}

export const sendMessageLogstash = async(req: Request, res: Response) => {
    const alerts = req.body;
    const message = `Problem: SSH Fail password\nProblem started at ${alerts["system.auth.timestamp"]}\nHost: ${alerts["system.auth.hostname"]}\nSeverity: High`;
    const validator = await sendMessageTelegram(message);
    if(!validator){
        return res.status(500).json({
            ok: false
        })
    }
    res.json({
        ok: true
    })
}
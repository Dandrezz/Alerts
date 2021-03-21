import { Request, Response } from "express";
import axios from "axios";

const bot_token = process.env.BOT_TOKEN || ''
const bot_chatID = process.env.BOT_CHATID || ''

const sendMessageTelegram = async(message: string):Promise<boolean> => {
    const send_text = message = 'https://api.telegram.org/bot' + bot_token + '/sendMessage?chat_id=' + bot_chatID + '&parse_mode=Markdown&text=' + message;
    
    try {
        const response = await axios.get(send_text);
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
            res.status(500).json({
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
        res.status(500).json({
            ok: false
        })
    }
    res.json({
        ok: true
    })
}
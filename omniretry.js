import BaseChatMessage from 'lightningsnapin/baseChatMessage';
import { track } from 'lwc';

const CHAT_CONTENT_CLASS = 'chat-content';
const AGENT_USER_TYPE = 'agent';
const CHASITOR_USER_TYPE = 'chasitor';
const SUPPORTED_USER_TYPES = [AGENT_USER_TYPE, CHASITOR_USER_TYPE];

/**
 * Displays a chat message using the inherited api messageContent and is styled based on the inherited api userType and messageContent api objects passed in from BaseChatMessage.
 */
export default class ChatMessageDefaultUI extends BaseChatMessage {
    @track messageStyle = '';

    isSupportedUserType(userType) {
        return SUPPORTED_USER_TYPES.some((supportedUserType) => supportedUserType === userType);
    }

    connectedCallback() {
        if (this.isSupportedUserType(this.userType)) {
            
            //alert(this.userType + ': ' + this.messageContent.value);
            if (this.userType == 'agent' && this.messageContent.value == 'Boo. Agents are NOT available.')
            {
                //We need to delay and call the retry
                //this.messageStyle = 'hideM';
                this.messageStyle = `${CHAT_CONTENT_CLASS} ${this.userType}`;
                
                setTimeout(function()
                { 
                    //alert('We can call a refresh here!');
                    //Send this message back to the bot from the chasitor
                    
                    window.postMessage(
                    {
                        message: "Are Agents Available?",
                        type: "chasitor.sendMessage"
                    },
                    window.parent.location.href
                );

                }, 5000);

            }
            else
            {
                this.messageStyle = `${CHAT_CONTENT_CLASS} ${this.userType}`;
            }


        } else {
            throw new Error('Unsupported user type passed in: ${this.userType}');
        }
    }
}
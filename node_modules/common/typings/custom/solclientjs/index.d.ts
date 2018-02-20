declare module "solclientjs" {

    export enum DestinationType {
        TOPIC = 0
    }

    export enum MessageUserCosType {
        COS1 = 0,
        COS2 = 1,
        COS3 = 2
    }

    export enum MessageType {
        BINARY = 0,
        MAP = 1,
        STREAM = 2,
        TEXT = 3
    }

    export enum MessageDeliveryModeType {
        DIRECT = 0,
        PERSISTENT = 1,
        NON_PERSISTENT = 2
    }

    export enum MutableSessionProperty {
        CLIENT_NAME = 1,
        CLIENT_DESCRIPTION = 2
    }

    export enum MessageDumpFlag {
        MSGDUMP_BRIEF = 0,
        MSGDUMP_FULL = 1
    }

    export enum StatType {
        TX_TOTAL_DATA_BYTES = 0,
        TX_TOTAL_DATA_MSGS = 1,
        TX_DIRECT_BYTES = 2,
        TX_DIRECT_MSGS = 3,
        TX_CONTROL_BYTES = 4,
        TX_CONTROL_MSGS = 5,
        TX_REQUEST_SENT = 6,
        TX_REQUEST_TIMEOUT = 7,
        RX_TOTAL_DATA_BYTES = 8,
        RX_TOTAL_DATA_MSGS = 9,
        RX_DIRECT_BYTES = 10,
        RX_DIRECT_MSGS = 11,
        RX_CONTROL_BYTES = 12,
        RX_CONTROL_MSGS = 13,
        RX_DISCARD_MSG_INDICATION = 14,
        RX_REPLY_MSG_RECVED = 15,
        RX_REPLY_MSG_DISCARD = 16,
        RX_DISCARD_SMF_UNKNOWN_ELEMENT = 17,
        CACHE_REQUEST_SENT = 18,
        CACHE_REQUEST_OK_RESPONSE = 19,
        CACHE_REQUEST_FAIL_RESPONSE = 20,
        CACHE_REQUEST_FULFILL_DISCARD_RESPONSE = 21,
        RX_CACHE_MSG = 22,
        CACHE_REQUEST_INCOMPLETE_RESPONSE = 23,
        CACHE_REQUEST_LIVE_DATA_FULFILL = 24
    }

    export enum CapabilityType {
        PEER_SOFTWARE_VERSION = 0,
        PEER_SOFTWARE_DATE = 1,
        PEER_PLATFORM = 2,
        PEER_PORT_SPEED = 3,
        PEER_PORT_TYPE = 4,
        MAX_DIRECT_MSG_SIZE = 5,
        PEER_ROUTER_NAME = 6,
        MESSAGE_ELIDING = 7,
        NO_LOCAL = 8
    }

    export enum LogLevel {
        FATAL = 0,
        ERROR = 1,
        WARN = 2,
        INFO = 3,
        DEBUG = 4,
        TRACE = 5
    }

    export enum SessionEventCode {
        UP_NOTICE = 1,
        DOWN_ERROR = 2,
        CONNECT_FAILED_ERROR = 3,
        CONNECTING = 4,
        REJECTED_MESSAGE_ERROR = 5,
        SUBSCRIPTION_ERROR = 6,
        SUBSCRIPTION_OK = 7,
        VIRTUALROUTER_NAME_CHANGED = 8,
        REQUEST_ABORTED = 9,
        REQUEST_TIMEOUT = 10,
        PROPERTY_UPDATE_OK = 11,
        PROPERTY_UPDATE_ERROR = 12,
        REAPPLY_SUBSCRIPTION_ERROR = 13,
        CAN_ACCEPT_DATA = 14,
        DISCONNECTED = 15,
        LOGIN_FAILURE = 16,
        P2P_SUB_ERROR = 17,
        PARSE_FAILURE = 18,
        DATA_DECODE_ERROR = 19,
        KEEP_ALIVE_ERROR = 20,
        INTERNAL_ERROR = 21
    }

    export enum ErrorSubcode {
        UNKNOWN_ERROR = 999,
        SESSION_NOT_CONNECTED = 2,
        INVALID_SESSION_OPERATION = 3,
        TIMEOUT = 4,
        MESSAGE_VPN_NOT_ALLOWED = 5,
        MESSAGE_VPN_UNAVAILABLE = 6,
        CLIENT_USERNAME_IS_SHUTDOWN = 7,
        DYNAMIC_CLIENTS_NOT_ALLOWED = 8,
        CLIENT_NAME_ALREADY_IN_USE = 9,
        CLIENT_NAME_INVALID = 10,
        CLIENT_DELETE_IN_PROGRESS = 11,
        TOO_MANY_CLIENTS = 12,
        LOGIN_FAILURE = 13,
        INVALID_VIRTUAL_ADDRESS = 14,
        CLIENT_ACL_DENIED = 15,
        SUBSCRIPTION_ACL_DENIED = 16,
        PUBLISH_ACL_DENIED = 17,
        PARAMETER_OUT_OF_RANGE = 18,
        PARAMETER_CONFLICT = 19,
        PARAMETER_INVALID_TYPE = 20,
        INTERNAL_ERROR = 21,
        INSUFFICIENT_SPACE = 22,
        OUT_OF_RESOURCES = 23,
        PROTOCOL_ERROR = 24,
        COMMUNICATION_ERROR = 25,
        KEEP_ALIVE_FAILURE = 26,
        TOPIC_MISSING = 28,
        INVALID_TOPIC_SYNTAX = 31,
        MESSAGE_TOO_LARGE = 32,
        XML_PARSE_ERROR = 33,
        SUBSCRIPTION_ALREADY_PRESENT = 34,
        SUBSCRIPTION_NOT_FOUND = 35,
        SUBSCRIPTION_INVALID = 36,
        SUBSCRIPTION_ERROR_OTHER = 37,
        SUBSCRIPTION_TOO_MANY = 38,
        SUBSCRIPTION_ATTRIBUTES_CONFLICT = 39,
        NO_LOCAL_NOT_SUPPORTED = 40,
        DATA_ERROR_OTHER = 42,
        CREATE_XHR_FAILED = 43,
        INTERNAL_CONNECTION_ERROR = 44,
        DATA_DECODE_ERROR = 45,
        INACTIVITY_TIMEOUT = 46,
        UNKNOWN_TRANSPORT_SESSION_ID = 47,
        AD_MESSAGING_NOT_SUPPORTED = 48,
        CREATE_WEBSOCKET_FAILED = 49,
        REPLICATION_IS_STANDBY = 50
    }

    export enum MessageCacheStatus {
        LIVE = 0,
        CACHED = 1,
        SUSPECT = 2
    }

    export enum SessionState {
        NEW = 0,
        CONNECTING = 1,
        CONNECTED = 2,
        SESSION_ERROR = 3,
        DISCONNECTING = 4,
        DISCONNECTED = 5
    }

    export enum SDTFieldType {
        BOOL = 0,
        UINT8 = 1,
        INT8 = 2,
        UINT16 = 3,
        INT16 = 4,
        UINT32 = 5,
        INT32 = 6,
        UINT64 = 7,
        INT64 = 8,
        WCHAR = 9,
        STRING = 10,
        BYTEARRAY = 11,
        FLOATTYPE = 12,
        DOUBLETYPE = 13,
        MAP = 14,
        STREAM = 15,
        DESTINATION = 16,
        NULLTYPE = 17,
        UNKNOWN = 18,
        SMF_MESSAGE = 19
    }

    export enum CacheLiveDataAction {
        FULFILL = 1,
        QUEUE = 2,
        FLOW_THRU = 3
    }

    export enum CacheReturnCode {
        OK = 1,
        FAIL = 2,
        INCOMPLETE = 3
    }

    export enum CacheReturnSubcode {
        REQUEST_COMPLETE = 0,
        LIVE_DATA_FULFILL = 1,
        ERROR_RESPONSE = 2,
        INVALID_SESSION = 3,
        REQUEST_TIMEOUT = 4,
        REQUEST_ALREADY_IN_PROGRESS = 5,
        NO_DATA = 6,
        SUSPECT_DATA = 7,
        CACHE_SESSION_DISPOSED = 8,
        SUBSCRIPTION_ERROR = 9
    }

    export type SDTFieldResult = boolean | number | string | SDTMapContainer | Destination;

    export class SDTField {
        static create(type: SDTFieldType, value: SDTFieldResult, error?: any): SDTField;
        getType(): SDTFieldType;
        getValue(): SDTFieldResult;
        toString(): string;
    }

    export class SDTMapContainer {
        getKeys(): Array<string>;
        getField(key: string): SDTField;
        deleteField(key: string): void;
    }

    export class SessionProperties {
        url: string;
        password: string;
        userName: string;
        clientName: string;
        applicationDescription: string;
        vpnName: string;
        vpnNameInUse: string;
        virtualRouterName: string;
        connectTimeoutInMsecs: number;
        readTimeoutInMsecs: number;
        sendBufferMaxSize: number;
        maxWebPayload: number;
        bufferedAmountQueryIntervalInMsecs: boolean;
        generateSendTimestamps: boolean;
        generateReceiveTimestamps: boolean;
        includeSenderId: boolean;
        keepAliveIntervalInMsecs: number;
        keepAliveIntervalsLimit: number;
        p2pInboxInUse: string;
        p2pInboxBase: string;
        userIdentification: string;
        generateSequenceNumber: boolean;
        subscriberLocalPriority: number;
        subscriberNetworkPriority: number;
        ignoreDuplicateSubscriptionError: boolean;
        ignoreSubscriptionNotFoundError: boolean;
        reapplySubscriptions: boolean;
        noLocal: boolean;
        transportProtocol: string;  // Can't use string based TransportProtocol enum
        transportProtocolInUse: string;
        transportDowngradeTimeoutInMsecs: number;
        transportContentType: string;
        toString(): string;
        clone(): SessionProperties;
        sol_validate(): void;
    }

    export class LogImpl {
        trace(...args: Array<any>): void;
        debug(...args: Array<any>): void;
        info(...args: Array<any>): void;
        warn(...args: Array<any>): void;
        error(...args: Array<any>): void;
        fatal(...args: Array<any>): void;
    }

    export class CacheRequestResult {
        getReturnCode(): CacheReturnCode;
        getReturnSubcode(): CacheReturnSubcode;
        getTopic(): Topic;
        getError(): any; // TODO: Work out errors better?
    }

    type MessageRxCBFunction = (Session, Message, any) => void;

    export class MessageRxCBInfo {
        constructor(messageRxCBFunction: MessageRxCBFunction, userObject?: any);
        messageRxCBFunction: MessageRxCBFunction;
        userObject: any;
    }

    export class CacheCBInfo {
        cacheCBFunction: (number, CacheRequestResult, any) => void;
        userObject: any;
    }

    type SessionEventCBFunction = (Session, SessionEvent, any) => void;

    export class SessionEventCBInfo {
        constructor(sessionEventCBFunction: SessionEventCBFunction, userObject?: any);
        sessionEventCBFunction: SessionEventCBFunction;
        userObject: any;
    }

    export class SessionEvent {
        constructor(sessionEventCode: SessionEventCode, infoStr: string, responseCode: number, errorSubCode: ErrorSubcode, correlationKey?: any, reason?: string);
        sessionEventCode: SessionEventCode;
        infoStr: string;
        responseCode: number;
        errorSubCode: ErrorSubcode;
        correlationKey: any;
        reason: string;
        toString(): string;
    }

    export class Session {
        connect(): void;
        disconnect(): void;
        dispose(): void;
        subscribe(topic: Topic, requestConfirmation?: boolean, correlationKey?: any, requestTimeout?: number): void;
        unsubscribe(topic: Topic, requestConfirmation?: boolean, correlationKey?: any, requestTimeout?: number): void;
        updateProperty(mutableSessionProperty: MutableSessionProperty, newValue: any, requestTimeout: number, correlationKey: any): void
        send(message: Message): void;
        sendRequest(message: Message, timeout: number, replyReceivedDBFunction: Function, requestFailedCBFunction: Function, userObject: any): void;
        sendReply(messageToReplyTo: Message, replyMessage: Message): void;
        getStat(statType: StatType): number;
        resetStats(): void;
        getSessionProperties(): SessionProperties;
        isCapable(capabilityType: CapabilityType): boolean;
        getCapability(capabilityType: CapabilityType): SDTField;
        getSessionState(): SessionState;
        setMessageCBInfo(messageCBInfo: MessageRxCBInfo): void; // Marked private in js, but we need it for testing purposes
        setEventCBInfo(eventCBInfo: SessionEventCBInfo): void; // Same as above
        createCacheSession(properties: CacheSessionProperties): CacheSession;
        getTransportInfo(): string;
    }

    export class CacheSessionProperties {
        getCacheName(): string;
        setCacheName(value: string): void;
        getMaxMessageAgeSec(): number;
        setMaxMessageAgeSec(value: number): void;
        getMaxMessages(): number;
        setMaxMessages(value: number): void;
        getTimeoutMsec(): number;
        setTimeoutMset(value: number): void;
    }

    export class CacheSession {
        validateProps(props: CacheSessionProperties): void;
        connectToSession(session: Session): void;
        dispose(): void;
        getProperties(): CacheSessionProperties;
        sendCacheRequest(requestID: number, topic: Topic, subscribe: boolean, liveDataAction: CacheLiveDataAction, cbInfo: CacheCBInfo): void;
        incStat(statType: StatType, value: number);
    }

    export class Destination {
        isTemporary(): boolean;
        getType(): DestinationType;
        getName(): string;
        toString(): string;
    }

    export class Topic extends Destination {
        getKey(): string;
    }

    export class Message {
        getType(): MessageType;
        setApplicationMessageId(value: string): void;
        getApplicationMessageId(): string;
        setApplicationMessageType(value: string);
        getApplicationMessageType(): string;
        setBinaryAttachment(value: string);
        getBinaryAttachment(): string;
        setCacheRequestID(cacheRequestID: string): void;
        getCacheRequestId(): string;
        setCorrelationId(value: string);
        setDeliverToOne(value: boolean);
        isDeliverToOne(): boolean;
        setDeliveryMode(value: MessageDeliveryModeType): void;
        getDeliveryMode(): MessageDeliveryModeType;
        setDestination(value: Destination): void;
        getDestination(): Destination;
        setDiscardIndication(value: boolean): void;
        isDiscardIndication(): boolean;
        setElidingEligible(value: boolean): void;
        isElidingEligible(): boolean;
        setCacheStatus(cacheStatus: MessageCacheStatus): void;
        getCacheStatus(): MessageCacheStatus;
        isReplyMessage(): boolean;
        isRedelivered(): boolean;
        setAsReplyMessage(value: boolean): void;
        getReceiverTimestamp(): number;
        setReplyTo(value: Destination): void;
        getReplyTo(): Destination;
        setSenderId(value: string): void;
        getSenderId(): string;
        setSenderTimestamp(value: number): void;
        getSenderTimestamp(): number;
        setSequenceNumber(value: number): void;
        getSequenceNumber(): number;
        setUserCos(value: MessageUserCosType): void;
        getUserCos(): MessageUserCosType;
        setUserData(value: string): void;
        getUserData(): string;
        setXmlContent(value: string): void;
        getXmlContent(): string;
        setXmlMetadata(value: string): void;
        getXmlMetadata(): string;
        setUserPropertyMap(value: SDTMapContainer): void;
        getUserPropertyMap(): SDTMapContainer;
        setSdtContainer(container: SDTField): void;
        getSdtContainer(): SDTField;
        dump(flags: number): string;
    }

    export class SessionStatistics {
        resetStats(): void;
        incStat(statType: StatType, value: number): void;
        getStat(statType: StatType): number;
    }

    export class SolclientFactory {
        static createSession(sessionProperties: SessionProperties, messageCallbackInfo?: MessageRxCBInfo, eventCallbackInfo?: SessionEventCBInfo): Session;
        static createTopic(topicName: string): Topic;
        static init(factoryProps: SolclientFactoryProperties): void;
        static setLogLevel(newLevel: LogLevel): void;
        static getLogLevel(): LogLevel;
        static createMessage(): Message;
    }

    export class SolclientFactoryProperties {
        logLevel: LogLevel;
        logger: LogImpl;
    }

}

export type StorePayload<PayloadType> = {
    payload: PayloadType;
};

export type AuthPage = "register" | "login";

export type ModalContentType = "none" | "form";

export type GamePage = "main" | "history" | "manage" | "bank" | "request" | "send";

export type LobbyPage = "waiting" | "join" | "create" | "start";

export type SupabaseResponse = {
    data: any;
    status: number;
};

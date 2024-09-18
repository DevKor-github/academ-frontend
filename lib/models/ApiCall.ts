type ApiCall<Req, Res> = (req: Req) => Promise<ApiResponse<Res>>;

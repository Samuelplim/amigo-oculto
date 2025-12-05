export const api = async <Payload>(props: {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
}): Promise<{ data: Payload; ok: boolean }> => {
    const response = await fetch(props.url, {
        method: props.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(props.body),
    });

    return { ok: response.ok, data: await response.json() };
};

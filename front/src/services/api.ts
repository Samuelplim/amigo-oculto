export const api = async <Response>(props: {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: unknown;
}): Promise<{ data: Response; ok: boolean }> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${props.url}`, {
        method: props.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(props.body),
    });

    return { ok: response.ok, data: await response.json() };
};

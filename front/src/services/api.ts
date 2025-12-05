export const api = async (props: { url: string; method: 'GET' | 'POST' | 'PUT' | 'DELETE'; body?: any }) => {
    const response = await fetch(props.url, {
        method: props.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(props.body),
    });
    return await response.json();
};

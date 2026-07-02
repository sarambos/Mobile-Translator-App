type Props = {
        q: string;
        source: string;
        target: string;
        apiUrl?: string;
        apiKey?: string;
}

// using code on https://docs.libretranslate.com/guides/api_usage/
export async function translateText({ q, source, target, apiUrl = 'http://localhost:5001', apiKey }: Props) {
    const body: any = {
        q,
        source,
        target,
        format: 'text',
    };
    if (apiKey) body.api_key = apiKey;

    const res = await fetch(`${apiUrl}/translate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Translate error ${res.status}: ${txt}`);
    }

    const data = await res.json();
    return data.translatedText ?? data.translations?.[0] ?? data;
}
export function searchSource(html) {
    const reg = /^src/;
    const reg2 = /youtube/;
    const otroreg = /\w|\d|:|\/|./;

    let final = '';

    const probe = /html/;
    if (probe.test(html)) return;

    const splitted = html.split(' ');
    const searchEmbed = splitted.find(el => reg.test(el));
    const source = searchEmbed.split('=');

    let onlySrc;
    if (source.find(el => reg2.test(el))) {
        onlySrc = source.find(el => reg2.test(el));
    } else {
        return;
    }

    for (let letter of onlySrc) {
        if (letter === '?') break;
        if (letter === '"') continue;
        if (otroreg.test(letter)) final += letter;
    }

    return final;
}
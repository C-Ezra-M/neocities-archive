const GRAPHEME_TO_PHONEME_TABLE = {
    "-": "",
    " ": " ",
    a: "a",
    e: "ɛ",
    i: "i",
    o: "ɔ",
    u: "u",
    ó: "u",
    y: "ɘ",
    ą: ["ɔ", "w̃"],
    ę: ["ɛ", "w̃"],
    b: "b",
    p: "p",
    f: "f",
    w: "v",
    m: "m",
    t: "t",
    d: "d",
    ni: ["ɳ", "j"],
    n: "n",
    rz: "ʐ",
    ż: "ʐ",
    ci: ["t͡ɕ", "j"],
    dzi: ["d͡ʑ", "j"],
    si: ["ɕ", "j"],
    zi: ["ʑ", "j"],
    ch: "x",
    sz: "ʂ",
    cz: "t͡ʂ",
    dż: "d͡ʐ",
    c: "t͡s",
    dz: "d͡z",
    ć: "t͡ɕ",
    dź: "d͡ʑ",
    ś: "ɕ",
    ź: "ʑ",
    s: "s",
    z: "z",
    k: "k",
    g: "ɡ",
    h: "x",
    l: "l",
    ł: "w",
    j: "j",
    r: "r",
    ń: "ɳ",
    q: "k",
    v: "v",
    x: ["k", "s"],
};

const VOICELESS_CONSONANTS = [
    "p",
    "f",
    "t",
    "s",
    "ʂ",
    "t͡ʂ",
    "t͡s",
    "t͡ɕ",
    "ɕ",
    "k",
    "x",
];
const VOICED_CONSONANTS = [
    "b",
    "v",
    "d",
    "z",
    "ʐ",
    "d͡ʐ",
    "d͡z",
    "d͡ʑ",
    "ʑ",
    "ɡ",
    "ɣ",
];

const VOWELS = ["a", "ɛ", "i", "ɔ", "u", "ɘ"];

const VOICEDNESS_TABLE = {
    // voiceless to voiced
    p: "b",
    f: "v",
    t: "d",
    s: "z",
    ʂ: "ʐ",
    t͡ʂ: "d͡ʐ",
    t͡s: "d͡z",
    t͡ɕ: "d͡ʑ",
    ɕ: "ʑ",
    k: "ɡ",
    x: "ɣ",
    // voiced to voiceless
    // bijection
    b: "p",
    v: "f",
    d: "t",
    z: "s",
    ʐ: "ʂ",
    d͡ʐ: "t͡ʂ",
    d͡z: "t͡s",
    d͡ʑ: "t͡ɕ",
    ʑ: "ɕ",
    ɡ: "k",
    ɣ: "x",
};

const ASSIMILATION_TABLE = {
    w̃: [
        {
            into: "ŋ",
            before: ["k", "ɡ"],
        },
        {
            into: "",
            before: ["l", "ł"],
        },
        {
            into: "n",
            before: ["t", "d", "t͡s", "d͡z", "t͡ʂ", "d͡ʐ"],
        },
        {
            into: "ɳ",
            before: ["t͡ɕ", "d͡ʑ", "ɕ", "ʑ"],
        },
        {
            into: "m",
            before: ["b", "p"],
        },
        {
            into: "",
            before: ["#END"],
            after: ["ɛ"],
        },
    ],
    n: [
        {
            into: "ŋ",
            before: ["k", "ɡ"],
        },
        {
            into: "ɳ",
            before: ["t͡ɕ", "d͡ʑ", "ɕ", "ʑ", "j", "i"],
        },
        {
            into: "m",
            before: ["b", "p"],
        },
    ],
    i: [
        {
            into: "j",
            before: VOWELS,
        },
    ],
    j: [
        {
            into: "i",
            before: [
                "m",
                "n",
                "ɳ",
                "l",
                "r",
                "p",
                "b",
                "f",
                "v",
                "t",
                "d",
                "s",
                "z",
                "ʂ",
                "ʐ",
                "t͡ʂ",
                "d͡ʐ",
                "t͡s",
                "d͡z",
                "t͡ɕ",
                "d͡ʑ",
                "ɕ",
                "ʑ",
                "k",
                "ɡ",
                "x",
                "ɣ",
            ],
            after: [
                "m",
                "n",
                "ɳ",
                "l",
                "r",
                "p",
                "b",
                "f",
                "v",
                "t",
                "d",
                "s",
                "z",
                "ʂ",
                "ʐ",
                "t͡ʂ",
                "d͡ʐ",
                "t͡ɕ",
                "d͡ʑ",
                "t͡s",
                "d͡z",
                "ɕ",
                "ʑ",
                "k",
                "ɡ",
                "x",
                "ɣ",
            ],
        },
        {
            into: "",
            before: VOWELS,
            after: ["ɳ", "t͡ɕ", "d͡ʑ", "ɕ", "ʑ"],
        },
    ],
};

/**
 * Turns a string into a sequence of phonemes in the IPA.
 *
 * @param {string} text The string to phonemize.
 */
export default function phonemize(text: string) {
    if (!text) return "";
    let ret: string[] = [];
    text = text.toLowerCase();
    for (let i = 0; i < text.length; ) {
        const checkedText = text.slice(i);
        let match = false,
            j: string;
        for (j in GRAPHEME_TO_PHONEME_TABLE) {
            match = false;
            if (checkedText.startsWith(j)) {
                ret.push(GRAPHEME_TO_PHONEME_TABLE[j]);
                i += j.length;
                match = true;
                break;
            }
        }
        if (!match) throw TypeError(`Unrecognized pattern: ${checkedText}`);
    }
    ret = ret.flat(1);
    const final = ret.pop();
    if (VOICED_CONSONANTS.includes(final)) {
        ret.push(VOICEDNESS_TABLE[final]);
    } else {
        ret.push(final);
    }
    for (let i = 0; i < ret.length; i++) {
        if (ret[i] in ASSIMILATION_TABLE) {
            for (let j of ASSIMILATION_TABLE[ret[i]]) {
                if (j.before.includes(ret[i + 1])) {
                    if (j.after?.includes(ret[i - 1]) || !j.after) {
                        console.log(
                            `Assimilation: ${ret[i]} -> ${j.into} before ${
                                ret[i + 1]
                            } in '${text}'`
                        );
                        ret[i] = j.into;
                        break;
                    }
                }
                if (j.before.includes("#END") && i + 1 === ret.length) {
                    console.log(
                        `Assimilation: ${ret[i]} -> ${j.into} before #END in '${text}'`
                    );
                    ret[i] = j.into;
                    break;
                }
            }
        }
    }
    for (let i = 0; i < ret.length; i++) {
        if (VOICED_CONSONANTS.includes(ret[i])) {
            // voiceless-voiced -> voiceless-voiceless (word-initially)
            if (
                i !== 0 &&
                ret[i - 1] !== " " &&
                ret[i - 1] !== "" &&
                (VOICELESS_CONSONANTS.includes(ret[i - 1]) || i === ret.length)
            ) {
                console.log(
                    `Assimilation: ${ret[i]} -> ${
                        VOICEDNESS_TABLE[ret[i]]
                    } before ${ret[i + 1]} in '${text}'`
                );
                ret[i] = VOICEDNESS_TABLE[ret[i]];
                break;
            }
            // voiced-voiceless -> voiceless-voiceless
            if (VOICELESS_CONSONANTS.includes(ret[i + 1]) || i === ret.length) {
                console.log(
                    `Assimilation: ${ret[i]} -> ${
                        VOICEDNESS_TABLE[ret[i]]
                    } before ${ret[i + 1]} in '${text}'`
                );
                ret[i] = VOICEDNESS_TABLE[ret[i]];
                break;
            }
        }
        if (VOICELESS_CONSONANTS.includes(ret[i])) {
            // voiceless-voiced -> voiced-voiced (not word-initially)
            if (
                i !== 0 &&
                ret[i - 1] !== " " &&
                ret[i - 1] !== "" &&
                (VOICED_CONSONANTS.includes(ret[i + 1]) || i === ret.length)
            ) {
                console.log(
                    `Assimilation: ${ret[i]} -> ${
                        VOICEDNESS_TABLE[ret[i]]
                    } before ${ret[i + 1]} in '${text}'`
                );
                ret[i] = VOICEDNESS_TABLE[ret[i]];
                break;
            }
        }
    }
    return ret.join("");
}

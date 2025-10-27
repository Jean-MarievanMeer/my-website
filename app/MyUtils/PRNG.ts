// Functie voor een Seedable Pseudo-Random Number Generator
export default function createSeededRandom(seed: string) {
    let s0 = 0;
    let s1 = 0;
    let s2 = 0;
    let c = 1;

    // Seeding functie (gebaseerd op Alea PRNG)
    const mash = (data: string) => {
        let n = 0xefc8249d;
        for (let i = 0; i < data.length; i++) {
            n += data.charCodeAt(i);
            let h = 0.02519603282416938 * n;
            n = h >>> 0;
            h -= n;
            h *= n;
            n = h >>> 0;
            h -= n;
            n += 0xefc8249d;
        }
        return (n + 0) * 2.3283064365386963e-10; // 2^-32
    };

    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');

    s0 = mash(seed + "s0");
    s1 = mash(seed + "s1");
    s2 = mash(seed + "s2");

    // De hoofdfunctie die het willekeurige nummer genereert
    return () => {
        const t = 20916375 * s0 + c * 2.3283064365386963e-10; // 2^-32
        s0 = s1;
        s1 = s2;
        return (s2 = t - (c = t | 0));
    };
}
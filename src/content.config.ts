
import { defineCollection, z } from 'astro:content';

import { readFileSync } from "node:fs";

type collectionData = {id: string, text: string};

const loader = async (uri: string) => {
        // let readStream = createReadStream("src/data/scripts.txt");
        let rawData = readFileSync(uri, 'utf8');

        let split = rawData.split("#").slice(1);

        split.forEach(s => s = s.trim());

        let scriptData: collectionData[] = [];

        split.forEach(s => {
            let id = s.slice(0, s.indexOf('\n')).trim();
            scriptData.push({id: id, text: s.trim()})
        })

        return scriptData;
}

// 3. Define your collection(s)
const scripts = defineCollection({ 
    loader: () => loader('src/data/scripts.txt')
 });
const prose = defineCollection({ 
    loader: () => loader('src/data/prose.txt')
 });

// 4. Export a single `collections` object to register your collection(s)
export const collections = { scripts, prose };
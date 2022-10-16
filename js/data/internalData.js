import { findParam } from "../utils/url-params.js";

const base = "../../media/upgrade-icons/";
export const internalData = [
    ["arms", {
            excerpt: "A cybernetic arm that grants enhanced strength and expanded combat abilities, while also providing a platform for other augmentations.",
            title: "Cybernetic Arm Augmentations",
            upgrades: "7",
            fullText: ``,
            iconSource: base + "icon-arm.png"
        }
    ],
            ["legs", {
                excerpt: "The Hermes 2027 Cybernetic Leg Prosthesis is an augmented artificial limb built on a framework of advanced polymers and lightweight metals.",
                title: "Cybernetic Leg Augmentations",
                upgrades: "7",
                fullText: ``,
                iconSource: base + "icon-leg.png"
            }
        ],
        ["head", {
            excerpt: "Cybernetic Cranium Augmentations which include the Social Enhancer and the Retinal Prosthesis.",
            title: "Cybernetic Cranium Augmentaions",
            upgrades: "7",
            fullText: ``,
            iconSource: base + "icon-head.png"
        }
        ],
        ["torso", {
            excerpt: "Cybernetic Chest Augmentations which include the new version of the Sentinel RX Health System.",
            title: "Cybernetic Torso Augmentations",
            upgrades: "7",
            fullText: ``,
            iconSource: base + "icon-torso.png"
        }
    ],
    ["chest", {
        excerpt: "Cybernetic Chest Augmentations which include the Cybernetic Rebreather.",
        title: "Cybernetic Chest Augmentations",
        upgrades: "7",
        fullText: ``,
        iconSource: base + "icon-chest.png"
    }
],
]

export function findValue(key, category = findParam("category")) {
    const result = internalData.filter(item => item[0] === category);
    return result[0][1][key]
}
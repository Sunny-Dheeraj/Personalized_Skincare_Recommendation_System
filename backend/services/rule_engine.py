import random
from collections import defaultdict


INGREDIENT_LIBRARY = {
    "aloe_vera": {
        "name": "Aloe Vera",
        "description": "Lightweight hydration that calms visible irritation and supports comfort.",
        "benefits": ["Barrier comfort", "Hydration", "Post-cleanse relief"],
        "tags": ["Soothing", "Sensitive-safe", "Hydrating"],
        "when": "AM / PM",
    },
    "alpha_arbutin": {
        "name": "Alpha Arbutin",
        "description": "Targets uneven tone gently for a more refined, brighter complexion.",
        "benefits": ["Tone support", "Pigmentation care", "Radiance"],
        "tags": ["Brightening", "Gentle active", "Even tone"],
        "when": "AM / PM",
    },
    "azelaic_acid": {
        "name": "Azelaic Acid",
        "description": "Versatile active for blemish-prone, red, or uneven-looking skin.",
        "benefits": ["Acne support", "Redness balance", "Tone refinement"],
        "tags": ["Derm-favorite", "Texture support", "Balanced"],
        "when": "PM",
    },
    "benzoyl_peroxide": {
        "name": "Benzoyl Peroxide",
        "description": "A focused breakout treatment best reserved for stronger acne activity.",
        "benefits": ["Blemish control", "Targeted treatment", "Oil support"],
        "tags": ["Power active", "Spot treatment", "Use carefully"],
        "when": "PM",
    },
    "caffeine": {
        "name": "Caffeine",
        "description": "Helps refresh the look of tired under-eyes and puffiness.",
        "benefits": ["Under-eye care", "Morning refresh", "Puffiness support"],
        "tags": ["Eye care", "Bright look", "AM hero"],
        "when": "AM",
    },
    "centella_asiatica": {
        "name": "Centella Asiatica",
        "description": "A skin-calming botanical that supports recovery and barrier resilience.",
        "benefits": ["Calming", "Barrier support", "Recovery"],
        "tags": ["Sensitive-safe", "Comforting", "Repair"],
        "when": "AM / PM",
    },
    "chamomile_extract": {
        "name": "Chamomile Extract",
        "description": "Soothes reactive skin and layers well into a minimal routine.",
        "benefits": ["Redness support", "Comfort", "Gentle care"],
        "tags": ["Botanical", "Sensitive-safe", "Soft finish"],
        "when": "AM / PM",
    },
    "clay": {
        "name": "Clay",
        "description": "Useful as a weekly balancing treatment when excess oil and congestion show up.",
        "benefits": ["Oil control", "Clarifying", "Pore appearance"],
        "tags": ["Weekly treatment", "Balancing", "Purifying"],
        "when": "PM",
    },
    "coenzyme_q10": {
        "name": "Coenzyme Q10",
        "description": "Supports skin that needs antioxidant care and a smoother-looking finish.",
        "benefits": ["Antioxidant support", "Smoothness", "Comfort"],
        "tags": ["Protective", "Supportive", "Glow"],
        "when": "PM",
    },
    "glycolic_acid": {
        "name": "Glycolic Acid",
        "description": "An exfoliating active that helps with tone and texture when used strategically.",
        "benefits": ["Texture polish", "Tone refinement", "Surface renewal"],
        "tags": ["Exfoliant", "Night use", "Alternate nights"],
        "when": "PM",
    },
    "green_tea_extract": {
        "name": "Green Tea Extract",
        "description": "Offers antioxidant and balancing support for combination or oily skin.",
        "benefits": ["Oil balance", "Antioxidant care", "Calming"],
        "tags": ["Botanical", "Balancing", "Fresh finish"],
        "when": "AM / PM",
    },
    "hyaluronic_acid": {
        "name": "Hyaluronic Acid",
        "description": "A foundational hydrator that keeps routines comfortable and well-cushioned.",
        "benefits": ["Hydration", "Plump look", "Barrier comfort"],
        "tags": ["Hydrating", "Universal", "Layering essential"],
        "when": "AM / PM",
    },
    "kojic_acid": {
        "name": "Kojic Acid",
        "description": "Supports targeted discoloration work and is best introduced gradually.",
        "benefits": ["Dark spot care", "Brightness", "Pigmentation focus"],
        "tags": ["Targeted active", "Even tone", "Use carefully"],
        "when": "PM",
    },
    "lactic_acid": {
        "name": "Lactic Acid",
        "description": "A softer exfoliating acid that can refine texture with a gentler feel.",
        "benefits": ["Texture support", "Gentle resurfacing", "Glow"],
        "tags": ["Gentler acid", "Night use", "Smoothness"],
        "when": "PM",
    },
    "licorice_extract": {
        "name": "Licorice Extract",
        "description": "Helps calm the look of uneven tone while keeping routines elegant and gentle.",
        "benefits": ["Tone support", "Comfort", "Brightness"],
        "tags": ["Botanical", "Brightening", "Calming"],
        "when": "AM / PM",
    },
    "niacinamide": {
        "name": "Niacinamide",
        "description": "A versatile all-rounder for oil balance, visible pores, and barrier support.",
        "benefits": ["Pore appearance", "Oil balance", "Barrier support"],
        "tags": ["Multi-tasking", "Derm staple", "Balanced"],
        "when": "AM / PM",
    },
    "peptides": {
        "name": "Peptides",
        "description": "Supportive ingredient for smoother, more resilient-looking skin over time.",
        "benefits": ["Firm look", "Barrier support", "Smoothness"],
        "tags": ["Supportive", "Repair-focused", "Elegant finish"],
        "when": "PM",
    },
    "retinol": {
        "name": "Retinol",
        "description": "A potent night active for texture and aging concerns that should be introduced gradually.",
        "benefits": ["Texture renewal", "Fine line support", "Clarity"],
        "tags": ["Night active", "High impact", "Alternate nights"],
        "when": "PM",
    },
    "salicylic_acid": {
        "name": "Salicylic Acid",
        "description": "A reliable option for congestion, oily areas, and blemish-prone skin.",
        "benefits": ["Blemish support", "Oil balance", "Pore care"],
        "tags": ["BHA", "Clarifying", "Breakout support"],
        "when": "PM",
    },
    "tranexamic_acid": {
        "name": "Tranexamic Acid",
        "description": "Pairs well into pigmentation-focused routines for a refined brightening plan.",
        "benefits": ["Pigmentation support", "Even tone", "Radiance"],
        "tags": ["Targeted brightening", "PM treatment", "Spot care"],
        "when": "PM",
    },
    "vitamin_c": {
        "name": "Vitamin C",
        "description": "An antioxidant brightener that shines in the morning routine.",
        "benefits": ["Brightness", "Daily antioxidant", "Tone support"],
        "tags": ["Morning hero", "Glow", "Protection support"],
        "when": "AM",
    },
    "vitamin_k": {
        "name": "Vitamin K",
        "description": "Supports the under-eye area, especially where shadowing is a key concern.",
        "benefits": ["Under-eye support", "Tone refinement", "Targeted care"],
        "tags": ["Eye care", "Focused", "Refining"],
        "when": "AM / PM",
    },
    "willow_bark_extract": {
        "name": "Willow Bark Extract",
        "description": "A gentler clarifying option for congestion-prone skin that needs restraint.",
        "benefits": ["Clarifying", "Surface balance", "Acne support"],
        "tags": ["Gentle active", "Balancing", "Sensitive-aware"],
        "when": "PM",
    },
    "zinc_pca": {
        "name": "Zinc PCA",
        "description": "Helps manage visible oiliness while keeping the routine lightweight.",
        "benefits": ["Oil control", "Balanced finish", "Blemish support"],
        "tags": ["Lightweight", "Refining", "Shine control"],
        "when": "AM / PM",
    },
}

TIPS = (
    "Aim for consistent hydration through the day rather than trying to catch up at night.",
    "A steady sleep schedule often shows up on your skin before a new serum does.",
    "Stress management can help reduce visible flare-ups and support overall skin balance.",
    "Protein, colorful produce, and healthy fats can support skin recovery from the inside out.",
    "Short daily walks can support circulation, mood, and the healthy look of your skin.",
)

MORNING_PRIORITY = (
    "vitamin_c",
    "niacinamide",
    "caffeine",
    "hyaluronic_acid",
    "green_tea_extract",
    "centella_asiatica",
    "zinc_pca",
    "alpha_arbutin",
    "licorice_extract",
    "vitamin_k",
)
NIGHT_PRIORITY = (
    "salicylic_acid",
    "azelaic_acid",
    "retinol",
    "tranexamic_acid",
    "alpha_arbutin",
    "peptides",
    "benzoyl_peroxide",
    "glycolic_acid",
    "lactic_acid",
    "kojic_acid",
    "coenzyme_q10",
    "willow_bark_extract",
)
CONFLICT_PAIRS = (
    ("retinol", "benzoyl_peroxide"),
    ("retinol", "glycolic_acid"),
    ("retinol", "lactic_acid"),
    ("glycolic_acid", "lactic_acid"),
    ("benzoyl_peroxide", "salicylic_acid"),
    ("benzoyl_peroxide", "glycolic_acid"),
)


def _bump(score_map, ingredient, amount):
    score_map[ingredient] += amount


def _add_unique(sequence):
    seen = set()
    result = []
    for item in sequence:
        if item not in seen and item in INGREDIENT_LIBRARY:
            seen.add(item)
            result.append(item)
    return result


def _resolve_conflicts(ingredients, scores, sensitive_skin):
    selected = set(ingredients)
    for left, right in CONFLICT_PAIRS:
        if left in selected and right in selected:
            left_score = scores[left]
            right_score = scores[right]
            if sensitive_skin and left in {"retinol", "benzoyl_peroxide", "glycolic_acid"}:
                selected.discard(left)
                continue
            if sensitive_skin and right in {"retinol", "benzoyl_peroxide", "glycolic_acid"}:
                selected.discard(right)
                continue
            if left_score >= right_score:
                selected.discard(right)
            else:
                selected.discard(left)
    return list(selected)


def _serialize_ingredients(ingredients):
    return [INGREDIENT_LIBRARY[name] | {"slug": name} for name in ingredients if name in INGREDIENT_LIBRARY]


def _pick_top(ingredients, priority, limit=3):
    ordered = [item for item in priority if item in ingredients]
    return ordered[:limit]


def _routine_step(order, title, description, icon, focus, ingredients):
    pretty_names = [INGREDIENT_LIBRARY[item]["name"] for item in ingredients if item in INGREDIENT_LIBRARY]
    return {
        "order": order,
        "title": title,
        "description": description,
        "icon": icon,
        "focus": focus,
        "ingredients": pretty_names,
    }


def build_hybrid_recommendation(
    *,
    skin_type,
    acne_severity,
    sensitive_skin,
    concern_names,
    ml_ranked_ingredients,
):
    scores = defaultdict(float)

    for position, item in enumerate(ml_ranked_ingredients):
        _bump(scores, item, max(1.0, 8.0 - position))

    concern_set = set(concern_names)

    if "Acne" in concern_set:
        _bump(scores, "niacinamide", 6)
        _bump(scores, "salicylic_acid", 6)
        _bump(scores, "azelaic_acid", 5)
        _bump(scores, "zinc_pca", 4)
        _bump(scores, "willow_bark_extract", 3)
        if acne_severity == "Severe" and not sensitive_skin:
            _bump(scores, "benzoyl_peroxide", 6)

    if "Pigmentation" in concern_set or "Spots" in concern_set:
        _bump(scores, "vitamin_c", 6)
        _bump(scores, "tranexamic_acid", 5)
        _bump(scores, "alpha_arbutin", 5)
        _bump(scores, "licorice_extract", 4)
        _bump(scores, "kojic_acid", 3)

    if "Dark Circles" in concern_set or "Under-eye Puffiness" in concern_set:
        _bump(scores, "caffeine", 6)
        _bump(scores, "vitamin_k", 5)

    if "Fine Lines" in concern_set:
        _bump(scores, "retinol", 5)
        _bump(scores, "peptides", 5)
        _bump(scores, "coenzyme_q10", 4)

    if "Visible Pores" in concern_set:
        _bump(scores, "niacinamide", 4)
        _bump(scores, "zinc_pca", 4)
        _bump(scores, "clay", 3)

    if "Surface Redness" in concern_set:
        _bump(scores, "centella_asiatica", 5)
        _bump(scores, "chamomile_extract", 4)
        _bump(scores, "azelaic_acid", 3)

    if skin_type == "Dry":
        _bump(scores, "hyaluronic_acid", 6)
        _bump(scores, "aloe_vera", 4)
        _bump(scores, "peptides", 3)
    elif skin_type == "Oily":
        _bump(scores, "niacinamide", 3)
        _bump(scores, "zinc_pca", 3)
        _bump(scores, "green_tea_extract", 3)

    if sensitive_skin:
        for harsh in ("benzoyl_peroxide", "glycolic_acid", "retinol", "kojic_acid"):
            scores[harsh] -= 3
        _bump(scores, "centella_asiatica", 5)
        _bump(scores, "aloe_vera", 5)
        _bump(scores, "chamomile_extract", 4)
        _bump(scores, "hyaluronic_acid", 4)

    ranked = [
        item
        for item, score in sorted(scores.items(), key=lambda pair: pair[1], reverse=True)
        if score > 0
    ]
    curated = _resolve_conflicts(ranked, scores, sensitive_skin)
    curated = _add_unique(curated)

    if sensitive_skin:
        curated = [item for item in curated if item not in {"benzoyl_peroxide", "glycolic_acid", "kojic_acid"}]
    if acne_severity == "Mild":
        curated = [item for item in curated if item != "benzoyl_peroxide"]

    curated = curated[:8]

    morning_focus = _pick_top(curated, MORNING_PRIORITY, limit=3)
    night_focus = _pick_top(curated, NIGHT_PRIORITY, limit=3)

    if not morning_focus:
        morning_focus = ["hyaluronic_acid", "niacinamide"] if skin_type != "Dry" else ["hyaluronic_acid", "aloe_vera"]
    if not night_focus:
        night_focus = ["azelaic_acid", "peptides"] if "Acne" in concern_set else ["peptides", "centella_asiatica"]

    morning_routine = {
        "title": "Morning Routine",
        "steps": [
            _routine_step(
                1,
                "Gentle Cleanse",
                "Use a mild cleanser to remove overnight oil without stripping the skin barrier.",
                "Sparkles",
                "Prep",
                [],
            ),
            _routine_step(
                2,
                "Targeted Serum",
                "Layer a lightweight serum blend that supports your main daytime goals.",
                "Droplets",
                "Treatment",
                morning_focus,
            ),
            _routine_step(
                3,
                "Barrier Moisturizer",
                "Seal in hydration with a non-comedogenic moisturizer suited to your skin type.",
                "Shield",
                "Balance",
                ["hyaluronic_acid", "centella_asiatica"] if sensitive_skin else ["hyaluronic_acid"],
            ),
            _routine_step(
                4,
                "Daily Sunscreen",
                "Finish with broad-spectrum SPF 30+ every morning, even on indoor days.",
                "SunMedium",
                "Protection",
                [],
            ),
        ],
    }

    night_description = "Use your night actives on alternating evenings if your skin feels overloaded."
    if sensitive_skin:
        night_description = "Keep the evening routine gentle and introduce any active slowly with rest nights."

    night_routine = {
        "title": "Night Routine",
        "steps": [
            _routine_step(
                1,
                "Cleanse & Reset",
                "Wash away sunscreen and buildup with a low-irritation cleanser.",
                "MoonStar",
                "Reset",
                [],
            ),
            _routine_step(
                2,
                "Treatment Layer",
                night_description,
                "FlaskConical",
                "Treatment",
                night_focus,
            ),
            _routine_step(
                3,
                "Recovery Moisturizer",
                "Choose a barrier-focused moisturizer to support overnight comfort and recovery.",
                "HeartPulse",
                "Recovery",
                ["peptides", "centella_asiatica"] if sensitive_skin else ["peptides", "coenzyme_q10"],
            ),
            _routine_step(
                4,
                "Weekly Extras",
                "If tolerated, add a clay mask or exfoliating night once weekly rather than stacking too many actives.",
                "Layers3",
                "Maintenance",
                [item for item in ("clay", "lactic_acid", "glycolic_acid") if item in curated][:2],
            ),
        ],
    }

    return {
        "ingredients": _serialize_ingredients(curated),
        "morning_routine": morning_routine,
        "night_routine": night_routine,
        "tip_of_the_day": random.choice(TIPS),
    }

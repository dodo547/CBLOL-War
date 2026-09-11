#!/usr/bin/env python3
import re
import os

WORKSPACE = os.path.dirname(os.path.abspath(__file__))

FILES = [
    "js/data/icons.js",
    "js/data/players.js",
    "js/data/teams.js",
    "js/data/champions.js",
    "js/data/items.js",
    "js/data/upgrades.js",
    "js/engine/audio.js",
    "js/engine/match-sim.js",
    "js/engine/tournament.js",
    "js/ui/team-creator.js",
    "js/ui/bracket-view.js",
    "js/ui/arena-view.js",
    "js/ui/confetti.js",
    "js/app.js",
]

def clean_file(rel_path):
    full_path = os.path.join(WORKSPACE, rel_path)
    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()

    lines = content.splitlines()
    cleaned_lines = []

    for line in lines:
        stripped = line.strip()
        # Drop import statements
        if stripped.startswith("import ") and "from" in stripped:
            continue
        if (stripped.startswith("import {") or stripped.startswith("import *") or stripped.startswith("import type")) and "from" in stripped:
            continue
        # Convert export declarations
        line = re.sub(r"^export\s+const\s+", "const ", line)
        line = re.sub(r"^export\s+class\s+", "class ", line)
        line = re.sub(r"^export\s+function\s+", "function ", line)
        line = re.sub(r"^export\s+let\s+", "let ", line)
        line = re.sub(r"^export\s+var\s+", "var ", line)
        line = re.sub(r"^export\s+default\s+", "", line)

        cleaned_lines.append(line)

    return "\n".join(cleaned_lines)

def build():
    parts = ['(function() {\n"use strict";\n']

    for file_path in FILES:
        parts.append(f"\n// =================== {file_path} ===================\n")
        cleaned = clean_file(file_path)
        parts.append(cleaned)
        parts.append("\n")

    # Expose global helpers on window if in browser
    parts.append("""
if (typeof window !== 'undefined') {
  window.MatchSimulator = MatchSimulator;
  window.TournamentManager = TournamentManager;
  window.CBLOL_TEAMS = CBLOL_TEAMS;
  window.SUMMONER_ICONS = SUMMONER_ICONS;
  window.CHAMPIONS = CHAMPIONS;
  window.getRandomTeamRoster = getRandomTeamRoster;
  window.getChampionById = getChampionById;
  window.getChampionsByRole = getChampionsByRole;
  window.calculateTeamStats = calculateTeamStats;
  window.getChampionVoiceUrl = getChampionVoiceUrl;
  window.LOL_ITEMS = LOL_ITEMS;
  window.getItemById = getItemById;
  window.getItemIconUrl = getItemIconUrl;
  window.getItemRecipeTree = getItemRecipeTree;
  window.getNextPurchaseStep = getNextPurchaseStep;
  window.getStarterItemForChampion = getStarterItemForChampion;
  window.ITEM_CATEGORIES = ITEM_CATEGORIES;
  window.getRecommendedItemForChampion = getRecommendedItemForChampion;
  window.PRO_PLAYERS = PRO_PLAYERS;
  window.getPlayersByRole = getPlayersByRole;
  window.getPlayerById = getPlayerById;
  window.getDefaultProRoster = getDefaultProRoster;
  window.TeamCreatorView = TeamCreatorView;
  window.ArenaView = ArenaView;
  window.BracketView = BracketView;
  window.sound = sound;
  window.confetti = confetti;
}

})();
""")

    bundle_content = "\n".join(parts)
    bundle_path = os.path.join(WORKSPACE, "js/bundle.js")
    with open(bundle_path, "w", encoding="utf-8") as f:
        f.write(bundle_content)
    print(f"Successfully generated js/bundle.js ({len(bundle_content)} bytes)")

if __name__ == "__main__":
    build()

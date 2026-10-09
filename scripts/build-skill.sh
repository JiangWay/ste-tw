#!/usr/bin/env bash
# 把 spec/ 和 glossary/ 複製到 skills/ste-tw/references/，讓 skill 資料夾可以單獨安裝。
# spec/ 和 glossary/ 是唯一來源；references/ 是產物，不放進版控。
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
ref="$root/skills/ste-tw/references"

mkdir -p "$ref/glossary"
cp "$root/spec/rules.md" "$root/spec/word-choice.md" "$ref/"
cp "$root"/glossary/*.csv "$ref/glossary/"

echo "Skill references updated: $ref"

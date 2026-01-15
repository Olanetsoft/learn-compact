#!/bin/bash

# Learn Compact - Exercise Verification Script
# Compiles all exercises and reports results

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
EXERCISES_DIR="$PROJECT_ROOT/exercises"

echo "🌙 Learn Compact - Exercise Verification"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if compactc is available
if ! command -v compactc &> /dev/null; then
    echo -e "${RED}Error: compactc compiler not found${NC}"
    echo "Please install the Compact compiler first."
    exit 1
fi

# Counters
TOTAL=0
PASSED=0
FAILED=0
SKIPPED=0

# Function to verify a single exercise
verify_exercise() {
    local exercise_path="$1"
    local exercise_name="$(basename "$(dirname "$exercise_path")")"
    
    TOTAL=$((TOTAL + 1))
    
    # Check if file exists and is not empty
    if [ ! -f "$exercise_path" ]; then
        echo -e "${YELLOW}⏭  $exercise_name - SKIPPED (file not found)${NC}"
        SKIPPED=$((SKIPPED + 1))
        return
    fi
    
    # Check if file has TODO comments (incomplete)
    if grep -q "TODO" "$exercise_path" 2>/dev/null; then
        echo -e "${YELLOW}📝 $exercise_name - INCOMPLETE (has TODO)${NC}"
        SKIPPED=$((SKIPPED + 1))
        return
    fi
    
    # Try to compile
    if compactc "$exercise_path" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ $exercise_name - PASSED${NC}"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}❌ $exercise_name - FAILED${NC}"
        FAILED=$((FAILED + 1))
    fi
}

# Verify a specific exercise if provided
if [ -n "$1" ]; then
    if [ -f "$1" ]; then
        verify_exercise "$1"
    else
        echo -e "${RED}Error: File not found: $1${NC}"
        exit 1
    fi
else
    # Verify all exercises
    echo "Scanning exercises..."
    echo ""
    
    # Find all exercise.compact files
    while IFS= read -r -d '' exercise; do
        verify_exercise "$exercise"
    done < <(find "$EXERCISES_DIR" -name "exercise.compact" -print0 | sort -z)
fi

echo ""
echo "========================================="
echo "Results:"
echo -e "  Total:   $TOTAL"
echo -e "  ${GREEN}Passed:  $PASSED${NC}"
echo -e "  ${RED}Failed:  $FAILED${NC}"
echo -e "  ${YELLOW}Pending: $SKIPPED${NC}"
echo ""

if [ $FAILED -gt 0 ]; then
    exit 1
fi

import React from "react";
import { render, screen } from "@testing-library/react";
import BattleResult from "./BattleResult"; // Adjust the import path as necessary
import '@testing-library/jest-dom';

describe("BattleResult component", () => {
    it("renders the battle result text correctly", () => {
        const props = {
            pokemonName: "Pikachu",
            attackName: "Thunderbolt",
            result: "It's super effective!"
        };

        render(<BattleResult {...props} />);

        const battleResultText = screen.getByText("Pikachu used Thunderbolt. It's super effective!");
        expect(battleResultText).toBeInTheDocument();
        expect(battleResultText).toHaveTextContent("Pikachu used Thunderbolt. It's super effective!");
    });

    it("renders the battle result text with different props", () => {
        const props = {
            pokemonName: "Charizard",
            attackName: "Flamethrower",
            result: "It's not very effective..."
        };

        render(<BattleResult {...props} />);

        const battleResultText = screen.getByText("Charizard used Flamethrower. It's not very effective...");
        expect(battleResultText).toBeInTheDocument();
        expect(battleResultText).toHaveTextContent("Charizard used Flamethrower. It's not very effective...");
    });
});
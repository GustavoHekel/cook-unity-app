import React from "react";
import { render, screen } from "@testing-library/react";
import Catalog from "./Catalog";
import { Card as CardInterface } from "@/interfaces";
import '@testing-library/jest-dom';

// Mock the Card component
jest.mock('../Card/Card', () => ({
    __esModule: true,
    default: ({ card }: { card: CardInterface }) => <div>{card.name}</div>
}));

describe("Catalog component", () => {
    const cards: CardInterface[] = [
        { id: 1, name: "Pikachu", hp: 100, imageURL: "/pikachu.png", type: { name: "Electric" }, rarity: { name: "Common" }, expansion: "Base Set", attackName: "Some attack", attackValue: 20, typeId: 1, weaknessTypeId: 1, weaknessValue: 1, rarityId: 1 },
        { id: 2, name: "Charizard", hp: 150, imageURL: "/charizard.png", type: { name: "Fire" }, rarity: { name: "Rare" }, expansion: "Base Set", attackName: "Some attack", attackValue: 20, typeId: 1, weaknessTypeId: 1, weaknessValue: 1, rarityId: 1 },
        { id: 3, name: "Bulbasaur", hp: 80, imageURL: "/bulbasaur.png", type: { name: "Grass" }, rarity: { name: "Common" }, expansion: "Base Set", attackName: "Some attack", attackValue: 20, typeId: 1, weaknessTypeId: 1, weaknessValue: 1, rarityId: 1 },
    ];

    it("renders a grid of cards", () => {
        render(<Catalog cards={cards} />);

        // Check if all cards are rendered
        cards.forEach(card => {
            expect(screen.getByText(card.name)).toBeInTheDocument();
        });
    });
});

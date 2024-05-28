import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/router";
import Card from "./Card";
import { Card as CardInterface } from "@/interfaces";
import '@testing-library/jest-dom';

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt }: { src: string, alt: string }) => <img src={src} alt={alt} />
}));

// Mock next/router
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

describe("Card component", () => {
    const card: CardInterface = {
        id: 1,
        name: "Pikachu",
        hp: 100,
        imageURL: "/pikachu.png",
        type: { name: "Electric" },
        rarity: { name: "Common" },
        expansion: "Base Set",
        attackName: "Test",
        attackValue: 20,
        rarityId: 1,
        typeId: 1,
        weaknessValue: 1,
        weaknessTypeId: 1
    };

    let push: jest.Mock;

    beforeEach(() => {
        push = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
            push,
        });
    });

    it("renders the card details correctly", () => {
        render(<Card card={card} />);
        const img = screen.getByAltText("Pikachu");
        expect(img).toHaveAttribute("src", "/pikachu.png");
        expect(screen.getByText("Pikachu")).toBeInTheDocument();
        expect(screen.getByText("HP: 100")).toBeInTheDocument();
        expect(screen.getByText("Type - Electric")).toBeInTheDocument();
        expect(screen.getByText("Rarity - Common")).toBeInTheDocument();
        expect(screen.getByText("Expansion - Base Set")).toBeInTheDocument();
    });

    it("navigates to the card details page on click", () => {
        render(<Card card={card} />);

        const cardElement = screen.getByRole('button');
        fireEvent.click(cardElement);

        expect(push).toHaveBeenCalledWith(`/cards/1`);
    });
});

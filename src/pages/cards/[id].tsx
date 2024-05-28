import React from "react";
import {Card as CardInterface} from "@/interfaces";
import {GetServerSideProps} from "next";
import Card from "@/components/Card/Card";
import {
    Box,
    Button,
    CssBaseline,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import BattleResult from "@/components/BattleResult/BattleResult";

const CardDetailsPage: React.FC<{ cards: CardInterface[], card: CardInterface }> = ({card, cards}) => {

    const [currentCard, setCurrentCard] = React.useState<string>('')
    const [battleResult, setBattleResult] = React.useState<string>()
    const [defender, setDefender] = React.useState<CardInterface>()

    React.useEffect(() => {
        const newDefender = cards.find(card => String(card.id) === String(currentCard))
        setDefender(newDefender)
    }, [currentCard, cards])

    const handleChange = (event: SelectChangeEvent<string>) => {
        setCurrentCard(event.target.value)
    }

    const handleClick = async () => {
        const battleResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/cards/${card.id}/${currentCard}`)
        const battle = await battleResponse.json()

        if (battle.data.winner) {
            setBattleResult("It's super effective")
        } else {
            setBattleResult("Not enough damage")
        }
    }

    return (
        <Box
            sx={{
                width: '800px',
                margin: '64px auto',
                display: 'flex',
                gap: 2,
                flexDirection: 'column'
            }}
        >
            <CssBaseline/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '400px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'end',
                        height: '100%'
                    }}
                >
                    <Card card={card}/>
                </Box>
                <Typography variant={"h4"}>VS</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        width: '400px',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '100%'
                    }}
                >
                    <FormControl
                        fullWidth={true}
                    >
                        <InputLabel id={"pokemon"}>Select pokemon card</InputLabel>
                        <Select
                            labelId={"pokemon"}
                            label={"Select pokemon card"}
                            onChange={handleChange}
                            value={currentCard}
                        >
                            {
                                cards && cards.map(card => (
                                    <MenuItem key={card.id} value={card.id}>{card.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    {defender && <Card card={defender}/>}
                </Box>
            </Box>
            <Button
                fullWidth={true}
                variant={"contained"}
                color={"primary"}
                onClick={handleClick}
                disabled={!defender}
            >
                Battle!
            </Button>
            {battleResult && <BattleResult pokemonName={card.name} attackName={card.attackName} result={battleResult}/>}

        </Box>

    )
}

export default CardDetailsPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const cardId = ctx.query.id

    try {

        const cardsResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/cards`)
        const cards = await cardsResponse.json()

        const cardResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/cards/${cardId}`)
        const card = await cardResponse.json()

        return {
            props: {
                cards: cards.data.cards,
                card: card.data
            }
        }
        /**
         * I wouldn't use ANY in a real prod app
         */
    } catch (err: any) {
        return {
            props: {
                error: err.message
            }
        }
    }


}
import React from "react";
import {Box, Card as MuiCard, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {Card as CardInterface} from "@/interfaces";
import {useRouter} from "next/router";
import Image from "next/image";

const Card: React.FC<{ card: CardInterface }> = ({card}) => {

    const router = useRouter()

    const handleClick = () => {
        router.push(`/cards/${card.id}`)
    }

    return (
        <MuiCard
            sx={{
                margin: 1,
                width: '300px',
            }}
            onClick={handleClick}
        >
            <CardActionArea>
                <CardMedia>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 2
                        }}
                    >
                        {card.imageURL && <Image src={card.imageURL} alt={card.name} width={60} height={60}/>}
                        <Typography variant={"caption"}>HP: {card.hp}</Typography>
                    </Box>

                </CardMedia>

                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Typography gutterBottom={true} variant={"h5"} component={"div"}>
                        {card.name}
                    </Typography>
                    <Typography variant={"overline"}>
                        Type - {card.type?.name}
                    </Typography>
                    <Typography variant={"overline"}>
                        Rarity - {card.rarity?.name}
                    </Typography>
                    <Typography variant={"overline"}>
                        Expansion - {card.expansion}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </MuiCard>
    )
}

export default Card
import React from "react";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {Rarity, Type} from "@/interfaces";
import {useRouter} from "next/router";

const Header: React.FC<{ rarities: Rarity[], types: Type[] }> = ({types, rarities}) => {

    const router = useRouter()

    const [rarity, setRarity] = React.useState(router.query.rarity as string || '')
    const [type, setType] = React.useState(router.query.type as string || '')

    const handleRarity = (event: SelectChangeEvent<string>) => {
        const value = event.target.value

        setRarity(value)
        router.push({
            query: {
                ...router.query,
                rarity: value
            }
        })
    }

    const handleType = (event: SelectChangeEvent<string>) => {
        const value = event.target.value

        setType(value)
        router.push({
            query: {
                ...router.query,
                type: value
            }
        })
    }

    return <Box
        sx={{
            display: 'flex',
            margin: 1
        }}
    >
        <Typography sx={{
            flexGrow: 2
        }} variant={"h4"}>Pokemon App</Typography>

        <Box
            sx={{
                display: 'flex',
                flexGrow: 1,
                gap: 1
            }}
        >
            <FormControl fullWidth={true}>
                <InputLabel id={"rarity"}>Select rarity</InputLabel>
                <Select
                    labelId={"rarity"}
                    label={"Select rarity"}
                    onChange={handleRarity}
                    value={rarity}
                >
                    {
                        rarities && rarities.map(rarity => (
                            <MenuItem key={rarity.id} value={rarity.id}>{rarity.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>

            <FormControl fullWidth={true}>
                <InputLabel id={"type"}>Select type</InputLabel>
                <Select
                    labelId={"type"}
                    label={"Select type"}
                    onChange={handleType}
                    value={type}
                >
                    {
                        types && types.map(type => (
                            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>


    </Box>
}

export default Header
import React from "react";
import {Typography} from "@mui/material";

const BattleResult: React.FC<{pokemonName: string, attackName: string, result: string}> = ({pokemonName, attackName, result}) => {

    return <>
        <Typography variant={"h5"}>{pokemonName} used {attackName}. {result}</Typography>
    </>
}

export default BattleResult
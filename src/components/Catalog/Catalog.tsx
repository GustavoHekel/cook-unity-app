import React from "react";
import {Card as CardInterface} from "@/interfaces";
import Card from "@/components/Card/Card";
import {Grid} from "@mui/material";

interface CatalogInterface {
    cards?: CardInterface[]
}

const Catalog: React.FC<CatalogInterface> = ({cards}) => {
    return (
        <Grid container>
            {
                cards?.map(card => (
                    <Grid key={card.id}
                          item
                          lg={3}
                          md={4}
                          sm={6}
                          xs={12}
                    >
                        <Card card={card} />
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default Catalog
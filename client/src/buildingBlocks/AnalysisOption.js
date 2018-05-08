import React, { Component } from 'react';
import styled from 'styled-components';

const Box = styled.div`
    background-color: var(--box-color);
    color: var(--main-color);
    text-align: center;
    width: 80%;
    margin: 20px 0px;
`;

const Link = styled.a`
    display: flex;
    justify-content: center;
    text-decoration: none;
`

const AnalysisOption = ({ title, description, key, path }) => (
    <Link href={path}>
        <Box key={key}>
            <h1>{title}</h1>
            <p>{description}</p>
        </Box>
    </Link>
)


export default AnalysisOption;
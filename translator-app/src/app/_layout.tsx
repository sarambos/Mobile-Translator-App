import React from "react";
import {Tabs} from "expo-router";
import { StatusBar } from "expo-status-bar";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ThemeProvider } from "../contexts/themeContext";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <React.Fragment>
                <StatusBar style="auto" />
            <Tabs
                screenOptions={{
                    headerStyle: {
                        backgroundColor: 'mediumpurple'
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    },
                    headerTitleAlign: 'center',
                    tabBarLabelPosition: 'below-icon',
                    tabBarActiveTintColor: 'mediumpurple',
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Translator",
                        tabBarLabel: "Home",
                        tabBarIcon: () => (
                            <MaterialCommunityIcons
                                name="home"
                                size={24}
                                color="black" />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="input"
                    options={{
                        tabBarButton: () => null
                    }}
                />
                <Tabs.Screen 
                    name="settings"
                    options={{
                        title: "Settings",
                        tabBarLabel: "Settings",
                        tabBarIcon: () => (
                            <MaterialCommunityIcons
                                name="cog"
                                size={24}
                                color="black" />
                        )
                    }}
                />
            </Tabs>
            </React.Fragment>
        </ThemeProvider>
    );
}
import colors from "@utils/colors";
import { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import ProductGridView from "./ProductGridView";
import React from "react";

export type LatestProduct = {
  id: string;
  name: string;
  thumbnail?: string;
  image?: string[];
  category: string;
  price: number;
  description: string;
  seller: {
    id: string;
    name: string;
    avatar?: { url: string };
  };
};

interface Props {
  data: LatestProduct[];
  onPress(product: LatestProduct): void;
}

const LatestProductList: FC<Props> = ({ data, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Listed Offers</Text>
      <ProductGridView data={data} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontWeight: "600",
    color: colors.primary,
    fontSize: 20,
    marginBottom: 15,
    letterSpacing: 0.5,
    marginLeft: 20
  },
});

export default LatestProductList;

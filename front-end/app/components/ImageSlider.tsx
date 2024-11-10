import ProductImage from "@ui/ProductImage";
import colors from "@utils/colors";
import React, { FC, useRef, useState } from "react";
import { View, StyleSheet, FlatList, Text, ViewToken } from "react-native";
import ImageView from "react-native-image-viewing";
import { TouchableOpacity } from "react-native";

interface Props {
  images?: string[];
}

const ImageSlider: FC<Props> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const viewableConfig = useRef({ itemVisiblePercentThreshold: 50 });

  const onViewableItemsChanged = useRef(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      setActiveIndex(info.viewableItems[0].index || 0);
    }
  );

  if (!images?.length) return null;

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatList}
        data={images}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setIsImageViewVisible(true)}>
            <ProductImage uri={item} />
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        viewabilityConfig={viewableConfig.current}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
      
      <View style={styles.indicator}>
        <Text style={styles.indicatorText}>
          {activeIndex + 1}/{images?.length}
        </Text>
      </View>

      <ImageView
        images={images.map(uri => ({ uri }))}
        imageIndex={activeIndex}
        visible={isImageViewVisible}
        onRequestClose={() => setIsImageViewVisible(false)}
        doubleTapToZoomEnabled
        swipeToCloseEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  flatList: { position: "relative" },
  indicatorText: { color: colors.white, fontWeight: "600" },
  indicator: {
    position: "absolute",
    width: 35,
    height: 25,
    backgroundColor: colors.backDropDark,
    bottom: 10,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});

export default ImageSlider;

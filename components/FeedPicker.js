import React, { Component } from "react";
import { Platform } from "react-native";
import { Container, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, Item as FormItem } from "native-base";
const Item = Picker.Item;

export default class FeedPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined
    };
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }
  render() {
    return (
        <Form>
          <Picker
            mode="dialog"
            placeholder="Click To Sort Articles"
            selectedValue={this.state.selected2}
            onValueChange={this.onValueChange2.bind(this)}
          >
            <Item label="Radically Left" value="key0" />
            <Item label="Radically Right" value="key1" />
            <Item label="Centric Articles" value="key2" />
            <Item label="Flagged as Fake" value="key3" />
            <Item label="Flagged as Offensive" value="key4" />
          </Picker>
        </Form>
    );
  }
}

import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

// Material UI
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

// UI
import List from '../ui/List'

const MenuItems = withRouter(({
  items,
  history
}) => {
  const links = items.map(item => (
    <ListItem
      button
      onClick={() => history.push(item)}>
      <ListItemText>{item}</ListItemText>
    </ListItem>
  ))

  return (
    <List component="nav">
      {links}
    </List>
  )
})

const Menu = ({
  toggleDrawer,
  isOpen,
  menuItems,
}) => (
  <Drawer
    open={isOpen}
    onClose={() => toggleDrawer(false)}>
    <div
      tabIndex={0}
      role="button"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() =>toggleDrawer(false)}
    >
      <MenuItems
        items={menuItems}/>
    </div>
  </Drawer>
)

export default Menu

import React, { Fragment, Component } from 'react'

// Material UI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'

// Relative components
import Menu from './Menu'

class Navbar extends Component {
  state = {
    isOpen: false,
  }

  toggleDrawer = isOpen => {
    this.setState({ isOpen })
  }

  render() {
    const {
      isOpen,
    } = this.state

    const {
      menuItems,
    } = this.props

    return (
      <AppBar
        position="static"
        color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={() => this.toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="title"
            color="inherit">
            IMP APP
          </Typography>
        </Toolbar>
        <Menu
          isOpen={isOpen}
          toggleDrawer={this.toggleDrawer}
          menuItems={menuItems} />
      </AppBar>
    )
  }
}

export default Navbar

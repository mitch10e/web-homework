import React from 'react'
import { useTranslation } from 'react-i18next'

// Material UI
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export default function NavBar () {
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position='fixed'>
        <Toolbar>
          <Typography className={classes.title} variant='h6'>
            {t('title')}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

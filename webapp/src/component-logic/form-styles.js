import { makeStyles } from '@material-ui/core/styles'

export const formStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginBottom: theme.spacing(2)
  },
  actions: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  button: {
    marginRight: theme.spacing(2)
  }
}))

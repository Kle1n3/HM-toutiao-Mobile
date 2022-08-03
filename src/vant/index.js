import Vue from 'vue';
import {
    Tabbar,
    List,
    Tab,
    Tabs,
    Dialog,
    Cell,
    Grid,
    GridItem,
    Image as VanImage,
    TabbarItem,
    NavBar,
    Field,
    Form,
    Button,
    CountDown,
    Toast,
    PullRefresh,
    Popup,
    Icon,
    Search,
    Loading,
    Divider,
    Picker,
    DatetimePicker,
} from 'vant';

Vue
    .use(Tabbar)
    .use(Picker)
    .use(DatetimePicker)
    .use(Search)
    .use(Divider)
    .use(Loading)
    .use(TabbarItem)
    .use(NavBar)
    .use(Field)
    .use(Form)
    .use(Button)
    .use(CountDown)
    .use(Toast)
    .use(VanImage)
    .use(Grid)
    .use(GridItem)
    .use(Cell)
    .use(Dialog)
    .use(Tab)
    .use(List)
    .use(Tabs)
    .use(PullRefresh)
    .use(Popup)
    .use(Icon)